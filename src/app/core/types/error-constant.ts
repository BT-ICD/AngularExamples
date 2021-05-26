export enum errorTypes{
    internetNotAvaileble,
    invalidExamCode
}
const internetNotAvaileble:string = 'Internet connection is not available. Please check your internet connection and try again.';
export const errorList = new Map<errorTypes, string>();
errorList.set(errorTypes.internetNotAvaileble, internetNotAvaileble);
errorList.set(errorTypes.invalidExamCode, "Invalid Exam Code");
