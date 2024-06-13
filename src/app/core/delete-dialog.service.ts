import { Injectable } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  constructor(private _delDialog:MatDialog) { }

  deleteConfirmDialog(msg:any){
   return this._delDialog.open(DeleteDialogComponent,{
    disableClose:true,
    data:{
      message:msg
    }
   })
  }
}
