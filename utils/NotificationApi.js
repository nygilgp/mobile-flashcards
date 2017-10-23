import { AsyncStorage } from 'react-native'
import { DECK_NOTIFICATION_KEY, slugify } from './helpers'
import { Permissions, Notifications } from 'expo';


class NotificationApi {

    static async clearLocalNotifications() {
        return AsyncStorage.removeItem(DECK_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
    }
    static async setLocalNotifications() {
        await AsyncStorage.getItem(DECK_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if(status == 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
                          let tomorrow = new Date()
                          tomorrow.setDate(tomorrow.getDate() + 1)
                          tomorrow.setHours(17)
                          tomorrow.setMinutes(0)

                          Notifications.scheduleLocalNotificationAsync(
                            {
                                title: 'Try a deck',
                                body: "Don't forget to quiz yourself today.",
                                android: {
                                    sound: true,
                                    priority: 'high',
                                    sticky: false,
                                    vibrate: true
                                }
                            },
                            {
                              time: tomorrow,
                              repeat: 'day',
                            }
                          )

                          AsyncStorage.setItem(DECK_NOTIFICATION_KEY, JSON.stringify(true))

                    }
                })
            }
        })
    }
}

export default NotificationApi
