import axios, { AxiosInstance } from 'axios';
import User from 'types/user';
import Image from 'types/image';
import CreatorPatch from 'types/creator-patch';
import UserUpdateData from 'types/user-update-data';
import UserWithImages from 'types/user-with-images';
import AuthService from './auth-service';
import store from '../store';
import { updateUser } from '../store/auth';
import SeekerPatch from '../types/seeker-patch';

const ProfileService = new (class ProfileService {
  private requester: AxiosInstance;

  static validateToken() {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Can not get user images without authentication');
    }

    return token;
  }

  constructor() {
    this.requester = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async updateUserData(body: SeekerPatch | CreatorPatch): Promise<void> {
    const token = ProfileService.validateToken();
    const {
      page, about, country, content,
    } = body;
    const patchData: UserUpdateData = {
      page,
      about,
      country,
      content: content.map((x) => x.id),
    };
    if ((body as SeekerPatch).business) {
      const { business } = body as SeekerPatch;
      patchData.business = business.map((x) => x.id);
    }
    const { data } = await this.requester.patch<User>('/users/', patchData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    store.dispatch(updateUser({ user: data }));
  }

  public async getUserData(): Promise<UserWithImages[]> {
    const token = ProfileService.validateToken();

    const { data } = await this.requester.get<UserWithImages[]>('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  public async getUserImages(): Promise<Image[]> {
    const token = ProfileService.validateToken();

    const { data } = await this.requester.get<Image[]>('/images/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  public async uploadImages(files: FileList): Promise<Image[]> {
    const token = ProfileService.validateToken();

    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formData.append('files', files[i]);
    }

    const { data } = await this.requester.post<Image[]>('/images/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  public async deleteImage(id: string): Promise<true> {
    const token = ProfileService.validateToken();

    await this.requester.delete(`images/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  }
})();

export default ProfileService;
