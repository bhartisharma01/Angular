export class GlobalConstants {
    // message
  public static genericError = 'Something went wrong. Please try again later';

  // Regex
  public static nameRegex = '[a-zA-Z0-9 ]*';
  public static emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static mobileRegex = '^[e0-9]{10,10}$';

  // variables

  public static error: string = 'error';

  //unauthorizes
  public static unauthorized:string ='You are not an authorized user to access this page.'
}
