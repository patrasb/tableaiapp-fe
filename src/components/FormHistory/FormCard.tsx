import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import { updateDoc, type DocumentSnapshot } from 'firelordjs';
import { type Form } from '@/models/form';
import IconButton from '@mui/material/IconButton';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/services/firebase';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/router';

const CardContentNoPadding = styled(CardContent)(`
  padding-bottom: 0;
  padding-top: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

interface Props {
  formDoc: DocumentSnapshot<Form>;
}

export default function FormCard({ formDoc }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const state = location.state as LocationState;

  const [imgSrc, setImgSrc] = useState<string>('');

  const active = formDoc.id === state?.parser?.formId;

  useEffect(() => {
    if (active && state?.parser?.imgSrc) setImgSrc(state.parser.imgSrc);
    else {
      const img = new Image();
      const fileRef = ref(storage, formDoc.id + '_600x300');
      getDownloadURL(fileRef).then((url) => (img.src = url));
      img.onload = () => setImgSrc(img.src);
    }
  }, [active]);

  const linkToState: LocationState = {
    parser: { formId: formDoc.id, previewImgSrc: imgSrc },
  };

  async function handleDeleteOnClick() {
    await updateDoc(formDoc.ref, { deleted: true });
  }

  return (
    <>
      <Tooltip title={`Click to view ${formDoc.data()?.name}`}>
        <Card sx={{ minWidth: 230, height: 180, borderRadius: 4, backgroundColor: active ? '#b794f6' : '#efe5fd' }}>
          <CardActionArea component={Link} to={ROUTES.app} state={linkToState}>
            <CardHeader
              sx={{ padding: 1 }}
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, fontSize: 10 }} aria-label='recipe'>
                  PDF
                </Avatar>
              }
              action={
                <IconButton
                  aria-label='settings'
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                  }}
                >
                  <MoreVertRoundedIcon />
                </IconButton>
              }
              title={
                <Typography width={140} noWrap>
                  {formDoc.data()?.name}
                </Typography>
              }
            />
            <Box marginX={1}>
              {imgSrc ? <CardMedia component='img' src={imgSrc} height={100} width={200} /> : <Skeleton variant='rectangular' height={100} width={200} />}
            </Box>
            <CardContentNoPadding>
              <Typography variant='overline' color='grey.800' paddingY={1}>
                {formDoc.data()?.createdAt ? formatDistanceToNow(formDoc.data()!.createdAt.toDate(), { addSuffix: true }) : 'Loading...'}
              </Typography>
            </CardContentNoPadding>
          </CardActionArea>
        </Card>
      </Tooltip>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
          <ListItemIcon sx={{ color: 'error.main' }} onClick={handleDeleteOnClick}>
            <DeleteRoundedIcon fontSize='small' />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
