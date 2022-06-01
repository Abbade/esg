import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  getGridNumericOperators,
  getGridStringOperators,
  GridActionsCellItem,
  GridCallbackDetails,
  GridColumns,
  GridRowId,
  GridRowParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useEsg from "../../hooks/useEsg";
import { IFeedbackList } from "../../interfaces/IFeedbackList";

export default function Dashboard() {
  const [rows, setRows] = React.useState([] as IFeedbackList[]);
  const { getFeedbacks } = useEsg();

  React.useEffect(() => {
    console.log("render");
    get();
  }, []);

  const get = async () => {
    let resp = await getFeedbacks();
    setRows(resp);
  };

  const handleDetailClick = React.useCallback(
    (params: GridRowParams) => () => {
      console.log("clicou pra aperta o  mapaa");
      console.log(params);
      let ltLg = `${params.row.latitude},${params.row.longitude}`;
      window.open(`https://maps.google.com/maps?q=${ltLg}&z=17`, "_blank");
    },
    []
  );
  const columnsEsg = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      type: "number",
      filterOperators: getGridNumericOperators().filter(
        (operator) => operator.value === "="
      ),
    },
    {
      field: "esg_name",
      headerName: "ESG Type",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      ),
    },
    {
      field: "subject_name",
      headerName: "Topic",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      ),
    },
    {
      field: "email",
      headerName: "Contact",
      flex: 1,
      filterOperators: getGridStringOperators().filter((operator) => {
        return operator.value === "contains";
      }),
    },
  ] as GridColumns<IFeedbackList>;
  const columns = React.useMemo<GridColumns<IFeedbackList>>(() => {
    let columnsByRoles = columnsEsg;
    columnsByRoles.push({
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={handleDetailClick(params)}
          />,
        ];
      },
    });
    return columnsByRoles;
  }, [handleDetailClick]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
