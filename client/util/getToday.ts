export const getToday = () => {
    let today = "";
        var date = new Date();
        var month = (date.getMonth() + 1);
        var day = (date.getDate() !== 1 ? date.getDate() - 1 : date.getDate());
        today = `${date.getFullYear()}-${month < 10 ? "0"+month : month}-${day < 10 ? "0"+day : day}`;
    if(today === ""){
        getToday();
        return "2022-09-01";
    }else{
        return today;
    }
  };

  export const getYesterDay = () => {
    let today = "";
        var date = new Date();
        var month = (date.getMonth() + 1);
        var day = (date.getDate() !== 1 ? date.getDate() - 1 : date.getDate());
        today = `${date.getFullYear()}-${month < 10 ? "0"+month : month}-${day < 11 ? "0"+(day-1) : day-1}`;
    if(today === ""){
        getYesterDay();
        return "2022-09-01";
    }else{
        return today;
    }
  };