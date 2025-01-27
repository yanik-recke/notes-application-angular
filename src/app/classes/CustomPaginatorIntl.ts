import { Injectable, inject } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";
import { NotesService } from "../services/notes.service";


@Injectable({
    providedIn: 'root'
})
export default class CustomPaginatorIntl extends MatPaginatorIntl {
    override changes = new Subject<void>();
    notesService = inject(NotesService);

    constructor() {
        super();
    }
    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.
    override itemsPerPageLabel = `Notes per page:`;

    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0) {
            return `Page 1 of 100`;
        }
        const amountPages = Math.ceil(this.notesService.notesLength / pageSize);
        return `Page ${page + 1} of ${amountPages}`;
    }

}