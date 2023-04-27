export class Pagination {
    skip: number = 0;
    limit: number = -1;
    count: boolean = false;

    constructor(skip: number = 0, limit: number = -1) {
        this.skip = skip;
        this.limit = limit;
    }
}