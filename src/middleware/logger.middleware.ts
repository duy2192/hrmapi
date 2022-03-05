import morgan from 'morgan';
const reqlogger=morgan(':method :url :status :res[content-length] ')
export default reqlogger;
// - :response-time ms