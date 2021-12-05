import userRouter from './user.route';


function route(app: any)
{
    app.use('/users', userRouter);
   
}

export default route;