import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; 
import { AppConfig } from '../app.config';
import { User } from '../_models/User';
import { TreeviewItem } from 'ngx-treeview';
import { RequestOptionService } from './requestoption.service';
import { map } from 'rxjs-compat/operator/map';
import { FamilyTree } from '../_models/FamilyTree';

@Injectable({ providedIn: 'root' })
export class FamilyTreeService {
  constructor(private requestOptionService: RequestOptionService,
    private http: HttpClient,
    private config: AppConfig) { }

  //Get Family Tree by Current login userid
  getFamilyTree(): Observable<TreeviewItem[]> {

    return this.http.get<any>(this.config.apiUrl + '/users/familytree/' + this.requestOptionService.currentUser.id);

  }

  deleteFamilyTree(id:number): Observable<number> {

    return this.http.delete<any>(this.config.apiUrl + '/users/familytree/?id=' + id);

  }

  saveFamilyTree(familyTree: FamilyTree): Observable<number> {

    debugger;//JSON.stringify(familyTree)
    return this.http.post<number>(this.config.apiUrl + '/users/familytree', JSON.stringify(familyTree));     
  
  }
}

