<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request, $articleId)
    {
        $userId = $request->user()->id;
        Article::findOrFail($articleId);

        $comment = new Comment();
        $comment->fill($request->validated());
        $comment->user_id = $userId;
        $comment->article_id = $articleId;
        $comment->save();

        return response()->json([
            "message" => "Comment created successfully",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
