import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mainpage from './templates/mainpage/mainpage'

function App() {
  return (
    <div className={classes.App}>
      <Mainpage/>
    </div>
  );
}

export default App;
