export module Api {
    export const API_URL = 'http://localhost:3030';

    export function ETAPAS_GET(token : string) {
        return {
            url: API_URL + '/api/projects/steps',
            options: {
            method: 'GET',
            headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + token},
            },
        };
    }

    export function EPTS_GET(token : string) {
        return {
            url: API_URL + '/api/projects/',
            options: {
            method: 'GET',
            headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + token},
            },
        };
    }

    export function ORDER_ETAPA(token : string, body : any) {
        return {
            url: API_URL + '/api/projects/reorder',
            options: {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + token},
                body: JSON.stringify(body)
            },
        };
    }

    export function LOGIN(email : string , senha: string){
        return {
            url: API_URL + '/api/user/login',
            options: {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email, passwordSystem: senha})
            },
        };       
    }
    
}

