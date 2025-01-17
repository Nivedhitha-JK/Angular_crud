import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpServiceService } from './services/emp-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeleteDialogService } from './core/delete-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName','lastName','email','dob',
    'gender','education','company','experience','package','action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'employee_app';

  constructor(private _dialog: MatDialog, private _empService:EmpServiceService, private _coreService:CoreService,private _delDiaServ:DeleteDialogService) {
    
  }
  ngOnInit() {
    this.getEmployeesList();
  }
  openEmpAddEditComp(){
    const dialogMsg = this._dialog.open(EmpAddEditComponent);
    dialogMsg.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeesList();
        }
      }
    })
  }
  getEmployeesList(){
   this._empService.getEmployeesList().subscribe({
    next:(res) =>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error:console.log,
   })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // deleteEmployeeBtn(id:number){
    
  //     this._empService.deleteEmployee(id).subscribe({
  //       next: (res)=>{
  //         this._coreService.openSnackBar('Employee deleted...!');
  //         this.getEmployeesList(); // refresh after deleting data
  //       },
  //       error:console.log,
  //      });
  // }


  openEditForm(data:any){
  const dialogEdit = this._dialog.open(EmpAddEditComponent,{
    data,
  });
  dialogEdit.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeesList();
      }
    }
  })

  }




  deleteEmployeeBtn(id:number){


    this._delDiaServ.deleteConfirmDialog('Are you sure want to delete?').afterClosed().subscribe(res =>{
      if(res){
        this._empService.deleteEmployee(id).subscribe({
          next: (res)=>{
            this._coreService.openSnackBar('Employee deleted...!');
            this.getEmployeesList(); // refresh after deleting data
          },
          error:console.log,
         });
      }
    })
    

}





}
