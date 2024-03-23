import express from 'express';
import BasicController from '../controller/basics.controller.js';

const router = express.Router();
const basicController = new BasicController();

router.get("/alltables", basicController.getAllTables);
router.post("/get-user-data", basicController.getUserData);
router.post("/allcolumns", basicController.getAllColumns)
router.post("/update-access", basicController.updateAccess)
router.post("/update-fields",basicController.updateSpecialAccessFields)
router.post("/get-spec-cols",basicController.getSpecialAccessTables)
router.post("/remove-spec-cols",basicController.removeSpecialAccessFields)
router.post("/get-count-user",basicController.getEntryCountsOfUser)
router.get("/get-count-tables",basicController.getEntryCountsAPI)
router.post("/get-notices", basicController.getNotices);
router.post("/send-notice", basicController.addNotices);

export default router;