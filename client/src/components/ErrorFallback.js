import { Box, makeStyles } from "@material-ui/core"
import configs from "../config";
import InfoText from "./InfoText"

const styles = () => makeStyles({
    mainContainer: {
        width: "100%",
        [`@media (min-width: ${configs.mobile_viewport}px && max-width: ${configs.mobile_viewport}px)`]: {
            marginTop: "1em",
        },
        marginTop: 10,
        marginBottom: 70,
    },
    title: {
        alignSelf: "center"
    }
})

const ErrorFallback = ({ error }) => {
    const classes = styles();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
            minHeight={460}
            className={classes.mainContainer}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                className={classes.mainContainer}
            >
                <InfoText
                    className={classes.title}
                    visible={true}
                    error
                    content={"Something went wrong..."}
                />
                <InfoText
                    visible={true}
                    content={`Please refresh your app. If the problem persists, contact jammit support mentioning the following:`}
                />
                <InfoText visible={true} content={error.toString()} />
            </Box>
        </Box>
    )
}

export default ErrorFallback