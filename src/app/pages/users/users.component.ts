import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { UserService } from '../../services/user.service'; // Import UserService
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule], // Include FormsModule
  providers: [UserService], // Include HttpClientModule
  template: `
    <div class="users-container p-6">
      <h2 class="text-2xl font-semibold mb-4">User Management</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" (click)="openUserDialog()">
        Add New User
      </button>
      
      <table class="min-w-full mt-6 bg-white shadow-md rounded-md">
        <thead>
          <tr class="border-b">
            <th class="px-6 py-3 text-left font-medium text-gray-600">Name</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Email</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Role</th>
            <th class="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users" class="border-b hover:bg-gray-50">
            <td class="px-6 py-3">{{ user.username }}</td>
            <td class="px-6 py-3">{{ user.email }}</td>
            <td class="px-6 py-3">{{ user.role }}</td>
            <td class="px-6 py-3">
              <button class="text-blue-500 hover:text-blue-600" (click)="editUser(user)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="text-red-500 hover:text-red-600 ml-4" (click)="deleteUser(user)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <div *ngIf="isEditModalOpen" class="modal-overlay" (click)="closeEditModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3 class="text-xl mb-4">Edit User</h3>
        <form (ngSubmit)="submitEditUser()">
          <div>
            <label for="name" class="block">Name:</label>
            <input id="name" [(ngModel)]="editedUser.username" name="name" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="email" class="block">Email:</label>
            <input id="email" [(ngModel)]="editedUser.email" name="email" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-4">
            <label for="role" class="block">Role:</label>
            <input id="role" [(ngModel)]="editedUser.role" name="role" class="p-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mt-6">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
            <button type="button" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md" (click)="closeEditModal()">Cancel</button>
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
  `]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  editedUser: any = {}; // For holding the edited user data
  isEditModalOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  openUserDialog() {}

  editUser(user: any) {
    this.editedUser = { ...user }; // Copy user data to editedUser
    this.isEditModalOpen = true; // Open the modal
  }

  closeEditModal() {
    this.isEditModalOpen = false; // Close the modal
  }

  submitEditUser() {
    if (this.editedUser.id) {
      this.userService.updateUser(this.editedUser.id, this.editedUser).subscribe(updatedUser => {
        // Replace the old user data with the updated data in the list
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.closeEditModal(); // Close the modal after saving
      });
    }
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }
}
