var logView = false;
class Debug  {

  /**
   * @param a
   */
  static log(a) {
    if(logView) {
      for(var i = 0; i < arguments.length; i++ )
      {
        console.log(arguments[i]);
      }
    }
  }
}