import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../pages/shared/models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule], // Include FormsModule here
  providers: [UserService],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Admin Management</h2>
      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        (click)="openAdminDialog()">
        Add New Admin
      </button>

      <div class="overflow-x-auto mt-6">
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let admin of admins" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ admin.username }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ admin.email }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <button 
                  class="text-blue-500 hover:text-blue-700"
                  (click)="editAdmin(admin)">
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  class="text-red-500 hover:text-red-700 ml-4"
                  (click)="deleteAdmin(admin)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Admin Modal -->
    <div *ngIf="isEditModalOpen" class="modal-overlay" (click)="closeEditModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3 class="text-xl mb-4">Edit Admin</h3>
        <form (ngSubmit)="submitEditAdmin()">
          <div>
            <label for="name" class="block">Name:</label>
            <input id="name" [(ngModel)]="editedAdmin.username" name="name" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="email" class="block">Email:</label>
            <input id="email" [(ngModel)]="editedAdmin.email" name="email" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
            <button type="button" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md" (click)="closeEditModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Create Admin Modal -->
    <div *ngIf="isCreateModalOpen" class="modal-overlay" (click)="closeCreateModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3 class="text-xl mb-4">Create New Admin</h3>
        <form (ngSubmit)="submitCreateAdmin()">
          <div>
            <label for="newName" class="block">Name:</label>
            <input id="newName" [(ngModel)]="newAdmin.username" name="newName" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="newEmail" class="block">Email:</label>
            <input id="newEmail" [(ngModel)]="newAdmin.email" name="newEmail" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="newPassword" class="block">Password:</label>
            <input id="newPassword" type="password" [(ngModel)]="newAdmin.motDePasse" name="newPassword" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Create Admin</button>
            <button type="button" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md" (click)="closeCreateModal()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
    }
  `],
})
export class AdminsComponent implements OnInit {
  admins: User[] = [];
  newAdmin: User = {
    username: '',
    name: '',
    email: '',
    motDePasse: '', // Include password
    role: 'admin'  // Automatically set to admin role
  }; // Initialize for new admin creation
  editedAdmin: User = {
    id: undefined,
    username: '',
    name: '',
    email: '',
    motDePasse: '',
    role: ''
  };
  isEditModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdmins().subscribe((admins) => {
      this.admins = admins;
    });
  }

  openAdminDialog() {
    this.isCreateModalOpen = true; // Open the modal to create a new admin
  }

  closeCreateModal() {
    this.isCreateModalOpen = false; // Close the modal
  }

  editAdmin(admin: User) {
    this.editedAdmin = { ...admin };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  submitCreateAdmin() {
    console.log("New Admin Data:", this.newAdmin);

    if (!this.newAdmin.username || !this.newAdmin.email || !this.newAdmin.motDePasse) {
        console.error("All fields are required");
        return;
    }

    this.userService.createUser(this.newAdmin).subscribe(
        newAdmin => {
            this.admins.push(newAdmin);
            this.closeCreateModal();
        },
        error => {
            console.error("Error creating admin:", error);
        }
    );
}



  submitEditAdmin() {
    if (this.editedAdmin.id) {
      this.userService.updateUser(this.editedAdmin.id, this.editedAdmin).subscribe(updatedAdmin => {
        const index = this.admins.findIndex(a => a.id === updatedAdmin.id);
        if (index !== -1) {
          this.admins[index] = updatedAdmin;
        }
        this.closeEditModal();
      });
    }
  }

  deleteAdmin(admin: User) {
    if (admin.id) {
      this.userService.deleteUser(admin.id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
