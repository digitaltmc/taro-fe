
import Taro from '@tarojs/taro'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"
import * as ApolloLinkHttp from 'apollo-link-http'

const fetch = async (url, options) => {
    const fetch_options = {
        //isShowLoading: false,
        //loadingText: '正在加载',
        url: url,
        data: options.body,
        method: options.method,
        //header: { 'content-type': contentType, /*'token': "aa"*/ },
    }
    const res = await Taro.request(fetch_options)
    res.text = () => Promise.resolve(JSON.stringify(res.data))
    return res
}
function injectFetcher(func) {
  return function(linkOptions) {
    return func.call(this, {
      ...linkOptions,
      fetch: fetch
    })
  }
}
ApolloLinkHttp.HttpLink = injectFetcher(ApolloLinkHttp.HttpLink)

export const client = new ApolloClient({  
    uri: BASE_URL + "graphql"
});

export const QUERY_LOGIN = gql`
    query Login( $user: String!, $password: String! ) {
        login( user: $user, password: $password ){
            id
            name
            mobile
            email
        }
    }
`
export const MUTATION_REGISTER = gql`
    mutation Register ( $name: String!, $password: String!, $email: String!, $mobile: String ) {
        register( person: {name: $name, password: $password, email: $email, mobile: $mobile} )
    }
`
export const QUERY_MEETING = gql`
    query Meeting ($date: Time!) {
        meeting( date: $date ){
            id
            agenda{
                role
                title
                duration
                member{
                    name
                    mobile
                    email
                    id
                }   
            }
            date
        }
    }
`
export const MUTATION_BOOKING = gql`
    mutation ( $date: Time!, $role: String! ){
        book(date: $date, role: $role) {
            id
            date
            agenda {
                role
                title
                duration
                member{
                    name
                    mobile
                    email
                    id
                }
            }
        }
    }
      
`
