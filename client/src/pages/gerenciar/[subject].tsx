import { GetStaticPaths, GetStaticProps } from "next"

export default function Manage(props) {
    console.log("🚀 ~ file: [subject].tsx ~ line 4 ~ Manage ~ props", props)

    return (
        <div>
            {props.subject}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = (ctx) => {

    const { subject } = ctx.params
    return {
        props: {
            subject
        }
    }


}