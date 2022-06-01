import * as React from "react";
import {
  DataGrid,
  getGridNumericOperators,
  getGridStringOperators,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import useUsers from "../../hooks/useUsers";
import { IUsers } from "../../interfaces/IUsers";

export default function Users() {
  const [rows, setRows] = React.useState([] as IUsers[]);
  const { changeStatus, getUsers } = useUsers();

  React.useEffect(() => {
    console.log("render");
    const get = async () => {
      let resp = await getUsers();
      setRows(resp);
    };
    get();
  }, []);



  const handleStatusClick = React.useCallback(
    (params: GridRowParams) => () => {
      handleChangeStatus(params.row.id, !params.row.active)
    },
    []
  );
  const handleChangeStatus = async(id: number, active : boolean) => {
    await changeStatus(id, active);
    let resp = await getUsers();
    setRows(resp);
  }
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
      field: "name",
      headerName: "Name",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      ),
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      ),
    },
  ] as GridColumns<IUsers>;
  const columns = React.useMemo<GridColumns<IUsers>>(() => {
    let columnsByRoles = columnsEsg;
    columnsByRoles.push({
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => {
        let labelName = params.row.active ? 'Disable' : 'Enable';
        return [
          <GridActionsCellItem
            label={labelName}
            showInMenu
            onClick={handleStatusClick(params)}
          />,
        ];
      },
    });
    return columnsByRoles;
  }, [handleStatusClick]);

  return (
    <div style={{ height: 'calc(100vh - 90px)', width: "100%" }}>
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
