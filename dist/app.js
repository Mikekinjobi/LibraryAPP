"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_graphql_1 = require("express-graphql");
const graphqlSchemas_1 = __importDefault(require("./Model/graphqlSchemas"));
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/dbConn');
require('dotenv').config();
connectDB();
const app = (0, express_1.default)();
const port = 3000;
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, cors_1.default)());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    console.log(req.headers.token);
    const token = req.headers.token;
    return {
        schema: graphqlSchemas_1.default,
        graphiql: { headerEditorEnabled: true },
        context: { token }
    };
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// mongoose.connection.once('open', ()=>{
//   console.log('Connected to Database');
//   app.listen(port, ()=>{console.log(`listening on ${port}`)});
// })
exports.default = app;
