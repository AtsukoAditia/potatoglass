import User from '../../Model/User'
import Message from '../../Model/Message'

export const Users = [
  // new User({ id: 1, name: 'Vendor Oke', role: 'Vendor', image: require('../../assets/images/logo.png'), isActive: true }),
  new User({ id: 2, name: 'Pondok Sneakhead', role: 'PT PDS', image: require('../../assets/images/logo.png'), isActive: false }),
  new User({ id: 3, name: 'Supriadi', role: 'PT Potato mister', image: require('../../assets/images/logo.png'), isActive: true }),
  new User({ id: 4, name: 'Amandela', role: 'Sumia Creative', image: require('../../assets/images/logo.png'), isActive: true })
]

export const MessagesUser1 = [
  new Message({ text: 'Bagaimana penawaran saya?', userId: 1, me: true, time: '6:45' }),
  new Message({ text: 'nego terakhir ga dapat bos?', userId: 2, me: false, time: '6:48' }),
  new Message({ text: 'belum bisa kalo segitu euyy', userId: 1, me: true, time: '6:50' }),
  new Message({ text: 'yahh, yaudah', userId: 2, me: false, time: '6:55' }),
  new Message({ text: 'jadi pak?', userId: 1, me: true, time: '6:59' }),
  new Message({ text: 'maaf, min', userId: 2, me: false, time: '7:05' }),
  new Message({ text: 'oke siap', userId: 1, me: true, time: '7:07' })
]

export const MessagesUser2 = [
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message()
]

export const MessagesUser3 = [
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message()
]
export const MessagesUser4 = [
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message(),
  new Message()
]
