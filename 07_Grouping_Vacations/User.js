export default class User {
  constructor({ user, endDate, startDate }) {
    this.userId = user._id;
    this.userName = user.name;
    this.vacations = [{ startDate, endDate }]
  }
  addVacation({ startDate, endDate }) {
    if(this.vacations.some((elem) => elem.startDate === startDate && elem.endDate === endDate)) return;
    this.vacations.push({ startDate, endDate });
  }
}