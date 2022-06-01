import {  AlertColor } from '@mui/material/Alert';

export interface IAuthContext {
    authenticated: boolean;
    loading: boolean;
    handleLogin: (email : string, senha : string) => Promise<boolean>;
    handleLogout: () => void;
    handleResp:(tipoResp : AlertColor, msg : string ) => void;
    abrirResp: boolean;
    msgResp: string;
    tipoResp: AlertColor;
    handleCloseResp: () => void;
    handleLoginGoogle: (googleData: any) => Promise<boolean>;

  }