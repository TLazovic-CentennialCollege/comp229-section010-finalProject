export class Incident
{
  constructor(
    // tslint:disable-next-line: variable-name
    public id?: number,
    public uid?: string,
    public status?: string,
    public description?: string,
    public priority?: string,
    public customerInfo?: {displayName: string, email: string},
    public narrative?: string,
    public resolution?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

  public toString(): string
  {
    return `
    Incident
    -------------------------------
    Uid        : ${this.uid}
    Description: ${this.description}
    Priority   : ${this.priority}
    CustInfo   : ${this.customerInfo.displayName} ${this.customerInfo.email}
    Narrative   : ${this.narrative}
    Resolution  : ${this.resolution}
    -------------------------------
    `;
  }
}
