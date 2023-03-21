import * as profService from "./prof.service";

export function auth(req: any, res: any) {
    let id = req.query.usr_id;
    let pwd = req.query.pwd;
    profService.findAll(id, pwd, req, res);

}