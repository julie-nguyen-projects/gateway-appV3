import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from 'app/core';
import { UserFeedService } from 'app/entities/feedService/user-feed';
import { UserConvService } from 'app/entities/conversationService/user-conv';
import { ExpUserService } from 'app/entities/ExperienceService/exp-user';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {
    user: User;

    constructor(
        private userService: UserService,
        private userExtraService: UserExtraService,
        private userFeedService: UserFeedService,
        private userConvService: UserConvService,
        private expUserService: ExpUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(user: User) {
        this.userService.delete(user.login).subscribe(response => {
            this.userExtraService.delete(user.id).subscribe(response => console.log(response), err => console.log(err));
            this.userFeedService.delete(user.id).subscribe(response => console.log(response), err => console.log(err));
            this.userConvService.delete(user.id).subscribe(response => console.log(response), err => console.log(err));
            this.expUserService.delete(user.id).subscribe(response => console.log(response), err => console.log(err));

            this.eventManager.broadcast({
                name: 'userListModification',
                content: 'Deleted a user'
            });
            this.activeModal.dismiss(true);
        });
    }
}
