const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

const IssuesRepo = require('./../services/issues/issuesRepository');

class IssuesController {

    async getIssues(req, res) {
        const page = req.qeury.page || 1;
        let issues;

        try {
            issues = await IssuesRepo.getListByPage(page);
        } catch (err) {
            return res.json({
                result: 0,
            });
        }

        return res.json({
            issues,
            result: 1,
        });
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async createIssue(req, res) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
        };

        try {
            await IssuesRepo.createIssue(data);

            return res.json({
                result: 1,
            });
        } catch (err) {
            return res.json({
                result: 0,
                error: err.toString(),
            });
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async updateIssue(req, res) {
        const id = req.params.id;
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
        };

        try {
            await IssuesRepo.updateIssue(ObjectId(id), data);

            return res.json({
                result: 1,
            });
        } catch (err) {
            return res.json({
                result: 0,
                error: err.toString(),
            });
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async deleteIssue(req, res) {
        const id = req.params.id;

        try {
            await IssuesRepo.removeIssue(ObjectId(id));

            return res.json({
                result: 1,
            });
        } catch (err) {
            return res.json({
                result: 0,
            });
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async getStats(req, res) {
        let stats;

        try {
            stats = await IssuesRepo.getStats();
        } catch (err) {
            return res.json({
                result: 0,
            });
        }

        return res.json({
            stats,
            result: 1,
        });
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    getSync(req, res) {
        const limit = req.qeury.limit || 1;
        const skip = req.qeury.offset || 0;
        let issues;

        try {
            issues = await IssuesRepo.getList(skip, limit);
        } catch (err) {
            return res.json({
                result: 0,
            });
        }

        return res.json({
            issues,
            result: 1,
        });
    }
}

const ctrl = new IssuesController();

router.get('/issues', ctrl.getIssues);
router.post('/issues', ctrl.createIssue);
router.put('/issue/:id', ctrl.updateIssue);
router.delete('/issue/:id', ctrl.deleteIssue);
router.get('/issues/stats', ctrl.getStats);
router.get('/issues/sync', ctrl.getSync);

module.exports = router;
