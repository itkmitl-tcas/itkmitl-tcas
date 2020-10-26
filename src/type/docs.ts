// export interface ITranscript {
//   name: string
//   payload?: FormData
//   isSaving: boolean
// }

export class Docs {
  append(name: any, arg1: any) {
    throw new Error("Method not implemented.");
  }
  docs: FormData;

  constructor() {
    this.docs = new FormData();
  }
}

export type IDocs = Docs;
