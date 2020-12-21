import React from 'react'
import { Paper } from '@material-ui/core'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    homePaper: {
        width: '80%',
        heigth: '80%',
        background: 'linear-gradient(#86BFC2, #ffffff)',
    }
  })

const HomePaper = () => {
    const classes = useStyles()
    return <Paper className={classes.homePaper}/>
}

export default HomePaper;