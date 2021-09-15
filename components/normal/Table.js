import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import styles from '../../styles/Normal.module.css'
import Grid from '@material-ui/core/Grid'
import { StateContext } from '../../utils/StateContext'
import Image from 'next/image'
import TableHead from '@material-ui/core/TableHead'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default function GamesTable() {
  const { state } = useContext(StateContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { largeTableHeight, filteredList, storesApi, isPhoneScreen } = state

  const timestampConvert = (timestamp) => {
    const dateObj = new Date(timestamp)

    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()
    const date = dateObj.getDate()
    return date + '/' + month + '/' + year
  }

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredList?.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const style = {
    tableContainer: {
      minWidth: !isPhoneScreen && '700px',
      maxWidth: '1500px',

      height: largeTableHeight + 'px',

      minHeight: !isPhoneScreen && '370px',

      position: 'relative',
    },
    table_grid_container: {
      // position: 'relative',
    },
  }

  return (
    <Grid container style={style.table_grid_container} justifyContent="center">
      <TableContainer
        component={Paper}
        className={styles.table_container}
        style={style.tableContainer}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
              // style={{ zIndex: 10 }}
              >
                Name
              </TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Reviews</TableCell>
              <TableCell align="right">Store</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.table_body}>
            {(rowsPerPage > 0
              ? filteredList?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredList
            ).map((store) => (
              <TableRow key={store.name}>
                <TableCell
                  style={{
                    width: '200px',
                    // position: 'sticky',
                    left: '0',
                    background: 'white',
                  }}
                  align="right">
                  <Grid
                    style={{
                      whiteSpace: 'nowrap',
                      flexWrap: 'nowrap',
                    }}
                    container
                    wrapping="nowrap"
                    alignItems="center"
                    spacing={3}>
                    <Grid item>
                      <Image
                        src={store.thumb}
                        layout="fixed"
                        height={50}
                        width={50}
                      />
                    </Grid>
                    <Grid style={{ flexShrink: 0 }} item>
                      {store.title}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  {store.releaseDate > 0 &&
                    timestampConvert(store.releaseDate * 1000)}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  {store.salePrice}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  {store.steamRatingPercent}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  {store.steamRatingCount}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  {
                    <Image
                      src={`https://www.cheapshark.com/${
                        storesApi?.data?.[store.storeID]?.images.logo
                      }`}
                      layout="fixed"
                      height={50}
                      width={50}></Image>
                  }
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter style={{ position: 'sticky', bottom: 0 }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={filteredList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  )
}
