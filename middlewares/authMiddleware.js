exports.isLogged = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Ops! Você não tem permissão para acessar essa página.');
    res.redirect('/users/login');
    return;
  }

  next();
};

exports.changePassword = (req, res) => {
  if (req.body.password != req.body['password-confirm']) {
    req.flash('error', 'Senhas distintas');
    res.redirect('/profile');
    return;
  }

  req.user.setPassword(req.body.password, async ()=>{
    await req.user.save();

    req.flash('success', 'Senha alterada com sucesso!');
    res.redirect('/');
  });
}; 