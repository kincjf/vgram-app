export class NotificationModel {
  image: string;
  name: string;
  msgType: 1; // 1: just posted a new posting 2: sent 1:1 3: added me as a friend 4: commented on my posting
  date: Date;
  isRead: boolean;
}

export class NotificationsModel {
  notifications: Array<NotificationModel>;
}
