export default {
    meetings: [{meetingId: "1", meetingDate: "2019-2-12"},
               {meetingId: "2", meetingDate: "2019-2-19"},
               {meetingId: "3", meetingDate: "2019-2-26"}],
    bookInfos: {
                "1":
                {date: "2019-2-12",
                 roles:[{role: "TMD", user:{userid: "111", name: "Test User1", avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549814559464&di=24e70d931f7ef885c485ef8add2d7806&imgtype=0&src=http%3A%2F%2Fpic32.nipic.com%2F20130802%2F13059255_195443210152_2.jpg"}},
                        {role: "TTM", user:{userid: "111", name: "Test User2", avatar: "http://b.hiphotos.baidu.com/image/pic/item/1f178a82b9014a90e7c1956da4773912b21bee67.jpg"}},
                        {role: "Speaker1", user: null},
                        {role: "Speaker2", user: null},
                        {role: "Speaker3", user: null},
                        {role: "IE1", user: null},
                        {role: "IE2", user: null},
                        {role: "IE3", user: null}]
                },
                "2":
                {date: "2019-2-19",
                 roles:[{role: "TMD", user: null},
                        {role: "TTM", user: {userid: "111", name: "Test User2", avatar: "http://b.hiphotos.baidu.com/image/pic/item/1f178a82b9014a90e7c1956da4773912b21bee67.jpg"}},
                        {role: "Speaker1", user: {userid: "111", name: "Test User1", avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549814559464&di=24e70d931f7ef885c485ef8add2d7806&imgtype=0&src=http%3A%2F%2Fpic32.nipic.com%2F20130802%2F13059255_195443210152_2.jpg"}},
                        {role: "Speaker2", user: null},
                        {role: "Speaker3", user: null},
                        {role: "IE1", user: null},
                        {role: "IE2", user: null},
                        {role: "IE3", user: null}]
                },
                "3":
                {date: "2019-2-26",
                 roles:[{role: "TMD", user: null},
                        {role: "TTM", user: null},
                        {role: "Speaker1", user: null},
                        {role: "Speaker2", user: {userid: "111", name: "Test User2", avatar: "http://b.hiphotos.baidu.com/image/pic/item/1f178a82b9014a90e7c1956da4773912b21bee67.jpg"}},
                        {role: "Speaker1", user: {userid: "111", name: "Test User1", avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549814559464&di=24e70d931f7ef885c485ef8add2d7806&imgtype=0&src=http%3A%2F%2Fpic32.nipic.com%2F20130802%2F13059255_195443210152_2.jpg"}},
                        {role: "Speaker3", user: null},
                        {role: "IE1", user: {userid: "333", name: "Test User3", avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549814559464&di=80ac5504d5ce26c3a604f60806822916&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201308%2F17%2F20130817153219_rksU5.jpeg"}},
                        {role: "IE2", user: null},
                        {role: "IE3", user: null}]
                }
    },
    roles:[
        {role: "TMD", desc: null},
        {role: "GE", desc: null},
        {role: "TTM", desc: null},
        {role: "Speaker1", desc: null},
        {role: "Speaker2", desc: null},
        {role: "Speaker1", desc: null},
        {role: "Speaker3", desc: null},
        {role: "IE1", desc: null},
        {role: "IE2", desc: null},
        {role: "IE3", desc: null}
    ]
}