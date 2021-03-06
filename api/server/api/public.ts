import * as express from 'express';

import logger from '../logs';
import Invitation from '../models/Invitation';

const router = express.Router();

router.get('/get-user', (req, res) => {
  res.json({ user: req.user || null });
});

router.get('/invitations/get-team-by-token', async (req, res) => {
  try {
    const team = await Invitation.getTeamByToken({
      token: req.query.token,
    });

    res.json({ team });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.post || err.toString() });
  }
});

router.post('/invitations/remove-invitation-if-member-added', async (req, res) => {
  try {
    const team = await Invitation.removeIfMemberAdded({
      token: req.body.token,
      userId: req.user.id,
    });

    res.json({ team });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.post || err.toString() });
  }
});

export default router;
