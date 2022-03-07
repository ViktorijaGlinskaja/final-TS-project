class ContentViewModel {
    constructor({ _id, title, createdAt, updatedAt }) {
        this.id = _id;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default ContentViewModel;