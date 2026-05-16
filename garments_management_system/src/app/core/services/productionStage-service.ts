import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ProductionStage } from "../../shared/model";

@Injectable({ providedIn: 'root' })
export class ProductionStageService {

    private apiUrl = environment.apiUrl + 'stages';

    constructor(private http: HttpClient) { }

    // GET all stages of a production
    getByProductionId(productionId: string) {
        return this.http.get<ProductionStage[]>(
            `${this.apiUrl}?productionId=${productionId}`
        );
    }

    // ADD stage
    addStage(stage: ProductionStage) {
        return this.http.post(this.apiUrl, stage);
    }

    // UPDATE stage
    updateStage(id: string, stage: ProductionStage) {
        return this.http.put(`${this.apiUrl}/${id}`, stage);
    }

    // DELETE stage
    deleteStage(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}