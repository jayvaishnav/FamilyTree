import { Component, OnInit,ViewChild, ViewContainerRef } from '@angular/core';
import { TreeviewItem, TreeviewComponent, DownlineTreeviewItem, TreeviewHelper, TreeviewConfig } from 'ngx-treeview';
import { FamilyTreeService } from '../../_services/familytree.service';
import { AlertService } from '../../_services/alert.service';
import { isNil, remove, reverse } from 'lodash';
import { AlertComponent } from '../alert/alert.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FamilyTree } from '../../_models/FamilyTree';
import { RequestOptionService } from '../../_services/requestoption.service';
import { fadeInContent } from '@angular/material';


//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-familytree',
  templateUrl: './familytree.component.html',
  styleUrls: ['./familytree.component.css']
})
export class FamilytreeComponent implements OnInit {

  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;

  //Properties
  model: FamilyTree;
  dropdownEnabled = false;
  items: TreeviewItem[];
  
  values: number[];
  rows: string[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  closeResult: string;
  selectedNode: TreeviewItem;
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  modalReference: any;
  //End of Properties


  constructor(private familyTreeService: FamilyTreeService,
    private alertService: AlertService,
    private requestOptionService: RequestOptionService,
    private modalService: NgbModal
  ) { }

 

  ngOnInit() {

    this.initializeData();
  }

  initializeData() {
    this.familyTreeService.getFamilyTree().subscribe((items: TreeviewItem[]) => {
      var familyTree = new TreeviewItem(this.convertToTreeviewItem(items));
      this.items = [familyTree];
    },
      error => {
        this.alertService.error(error, false);
      });
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

  removeItem(item: TreeviewItem) {
    let isRemoved = false;
    debugger;
    this.familyTreeService.deleteFamilyTree(item.value).subscribe((id: number) => {
      isRemoved = id == 0 ? false : true;

      if (isRemoved) {
        this.initializeData();
        this.alertService.success("Record Removed Successfully!")
      }
     
    },
      error => {
        this.alertService.error(error, false);
      });
    
  }
 
  addItem(item: TreeviewItem, content) {
    debugger;
    this.selectedNode = item;
    this.model = new FamilyTree();
    this.model.userid = this.requestOptionService.currentUser.id;
    this.model.ParentId = item.value;
    this.model.id = 0;
   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

   // alert(item.text);
  }

  editItem(item: TreeviewItem, content) {
    debugger;
    this.selectedNode = item;
    this.model.userid = this.requestOptionService.currentUser.id;
    this.model.ParentId = 0;
    this.model.id = item.value;
    let nameArr = item.text.split(" ");
    if (nameArr.length > 0)
      this.model.firstname = nameArr[0];
    if (nameArr.length > 1)
      this.model.lastname = nameArr[1];

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    // alert(item.text);
  }

  saveTreeNode() {
   
    //let fname = this.model.firstname;
    //let lname = this.model.lastname;
    let familyTree = this.model;
    //familyTree.firstname = fname;
    //familyTree.id = 0;
    //familyTree.lastname = lname;
    //familyTree.userid = this.requestOptionService.currentUser.id
    //familyTree.ParentId = this.selectedNode.value;
    

    this.familyTreeService.saveFamilyTree(familyTree).subscribe((id: number) => {
      if (id == 0)
        this.alertService.error("something wrong at API", false);
      else {
        debugger;
        this.initializeData();
        this.alertService.success("Record Saved Successfully!",false)
       
      }
    },
      error => {
        this.alertService.error(error, false);
      });
  }

  hoverItem(item: TreeviewItem) {
    //item
    //alert(item.value);
    

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  private convertToTreeviewItem(array) {    
    
    var map = {};
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      obj.children = [];

      map[obj.value] = obj;

      var parentId = obj.parentId || '0';
      if (!map[parentId]) {
        map[parentId] = {
          children: []
        };
      }      
      map[parentId].children.push(obj);

    }
   
    return map['0'].children[0];

  }
}
