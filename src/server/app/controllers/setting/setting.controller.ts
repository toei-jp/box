/**
 * 設定
 */
import * as cinerino from '@toei-jp/cinerino-api-nodejs-client';
import * as debug from 'debug';
import { Request, Response } from 'express';
import { getOptions } from '../base/base.controller';
const log = debug('box:setting');

/**
 * 券売機設定ページ表示
 * @function index
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function index(req: Request, res: Response): Promise<void> {
    try {
        const options = getOptions(req);
        const movieTheaters = await new cinerino.service.Organization(options).searchMovieTheaters({});
        log('movieTheaters: ', movieTheaters);
        res.locals.movieTheaters = movieTheaters.data;
        res.render('setting/index');
    } catch (err) {
        log(err);
        res.locals.error = err;
        res.render('error/index');
    }
}
