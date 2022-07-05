
exports.getFahrenheitTemperature = /*async*/ (req, res, next) => {
  /*const tour = await Tour.findById(req.params.id);

  if(!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }*/

  res.status(200).json({
    status: 'success',
    data: {

    }
  });
};