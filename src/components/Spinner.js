import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.spinerContainer}>
      <div className={classes["loading-spinner"]}></div>
    </div>
  );
};

export default Spinner;
