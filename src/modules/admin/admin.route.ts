import express, { Application } from "express";
import { adminController } from "./admin.controller";
import AuthVerify, { userRole } from "../../middleware/authVerify";


const adminRouter: Application = express();
adminRouter.get('/', (req, res) => {
    res.send('admin route');
});
adminRouter.get('/category', adminController.getCategory)
adminRouter.get('/dashboard', AuthVerify(userRole.ADMIN), adminController.getAdminDashboardCard)
adminRouter.get('/dashboard/chart', AuthVerify(userRole.ADMIN), adminController.adminChartData)

adminRouter.post('/category', AuthVerify(userRole.ADMIN), adminController.createCategory)




export const adminRoute = adminRouter;