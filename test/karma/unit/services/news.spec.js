(function() {
    'use strict';

    // News Controller Spec
    describe('startupwichita services', function () {
        // Load the startupwichita module
        beforeEach(module('startupwichita'));

        describe('newsService', function () {
            it ('should issue PUT request to /api/v1/tags1', inject(function(News, $httpBackend) {
                var updateNews,
                    updateTimestamp = Date.now();

                $httpBackend.when('PUT', '/api/v1/news').respond({id: '507f1f77bcf86cd799439011', name: 'News 1', updated: updateTimestamp});

                updateNews = new News({
                    id: '507f1f77bcf86cd799439011',
                    name: 'News 1'
                });

                updateNews.$update();

                $httpBackend.flush();
                expect(updateNews.id).toEqual('507f1f77bcf86cd799439011');
                expect(updateNews.name).toEqual('News 1');
                expect(updateNews.updated).toEqual(updateTimestamp);
            }));
        });

        describe('newsService', function () {
            it ('should issue GET request to /api/v1/news?search=news', inject(function(News, $httpBackend) {
                $httpBackend.when('GET', '/api/v1/news?search=news').respond([
                    {id: '507f1f77bcf86cd799439011', name: 'News 1'},
                    {id: '507f1f77bcf86cd799439012', name: 'News 2'}
                ]);

                var news = News.search({search: 'news'});

                $httpBackend.flush();
                expect(news[0].id).toEqual('507f1f77bcf86cd799439011');
                expect(news[0].name).toEqual('News 1');
            }));
        });
    });
})();
