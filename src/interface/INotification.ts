export enum TypeNotification {
  SUCCESS,
  FAIL,
  WARNING,
}

export default interface INotification {
  id: number;
  title: string;
  type: TypeNotification;
  text: string;
}
