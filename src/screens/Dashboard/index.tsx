import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  getGridStringOperators,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useEsg from "../../hooks/useEsg";
import { IFeedbackList } from "../../interfaces/IFeedbackList";
import FeedbackModal from "../../components/FeedbackModal/indext";
import Container from '@mui/material/Container';
const initialValue = {
  id: 0,
  description: '',
  email: '',
  esg_name: '',
  subject_name: '',
} as IFeedbackList;

export default function Dashboard() {
  const [rows, setRows] = React.useState([] as IFeedbackList[]);
  const { getFeedbacks } = useEsg();
  const [feedbackData, setFeedbackData] = React.useState(initialValue);
  const [openFeedback, setOpenFeedback] = React.useState(false);

  React.useEffect(() => {
    const get = async () => {
      let resp = await getFeedbacks();
      setRows(resp);
    };
    get();
  }, []);

 

  const handleClose = () => {
    setOpenFeedback(false);
  };

  const handleDetailClick = React.useCallback(
    (params: GridRowParams) => () => {
      setFeedbackData(params.row);
      setOpenFeedback(true);
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
    <div style={{ height: 'calc(100vh - 90px)', width: "100%" }}>
      <FeedbackModal 
        open={openFeedback}
        data={feedbackData}
        onClose={handleClose}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        disableSelectionOnClick
      />
    </div>
  );
}
