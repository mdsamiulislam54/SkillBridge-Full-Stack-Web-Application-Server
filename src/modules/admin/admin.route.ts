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
adminRouter.get('/all-user', AuthVerify(userRole.ADMIN), adminController.getAllUser)
adminRouter.get('/all-booking', AuthVerify(userRole.ADMIN), adminController.getAllBooking)



adminRouter.post('/category', AuthVerify(userRole.ADMIN), adminController.createCategory)

adminRouter.patch('/manage/user/:id', AuthVerify(userRole.ADMIN), adminController.updateUserStatus)
adminRouter.patch('/manage/category/:id', AuthVerify(userRole.ADMIN), adminController.updateCategory)

adminRouter.delete('/manage/category/:id', AuthVerify(userRole.ADMIN), adminController.deletedCategory)



export const adminRoute = adminRouter;