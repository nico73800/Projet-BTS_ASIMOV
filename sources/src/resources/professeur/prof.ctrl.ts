import * as profService from "./prof.service";

export function auth(req: any, res: any) {
    let id = req.body.usr_id;
    let pwd = req.body.pwd;
    profService.findProf(id, pwd, req, res);
}