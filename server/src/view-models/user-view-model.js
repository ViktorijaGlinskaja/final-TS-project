import ContentViewModel from './content-view-model.js';
import BusinessViewModel from './business-view-model.js';

class UserViewModel {
    constructor ({ _id, name, email, role, createdAt, updatedAt, country, business, page, about, content }){
        this.id = _id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.content = content.map(x => new ContentViewModel(x));
        this.country = country;
        this.business = business.map(x => new BusinessViewModel(x));
        this.page = page;
        this.about = about;
    }
}

export default UserViewModel;