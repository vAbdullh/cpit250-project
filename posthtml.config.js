module.exports = {
    plugins: {
        'posthtml-preload': {
            include: 'static/css/*.css',
            as: 'style',
        },
    },
};
