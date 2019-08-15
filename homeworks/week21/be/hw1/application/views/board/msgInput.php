<article class="article">
  <section>
    <h2>歡迎留言</h2>

    <?php echo validation_errors(); ?>
    <?php $attribute = array('class' => 'enterTextBox') ?>
    <?php echo form_open('', $attribute) ?>
      <textarea 
        class="comment"
        name="content"
        placeholder="想說些什麼嗎？"
      ></textarea><br />
      
      <?php if($this->session->userdata('username')) { ?>
        <input class='submit' type='submit' value='送出!' />
      <?php } else { ?>
        <div class='submit'>請先登入會員</div>
      <?php } ?>
    </form>



      <!-- <?php 
        echo (isset($_COOKIE["member_id"]))?
          "<input class='submit' type='submit' value='送出!' />" :
          "<div class='submit'>請先登入會員</div>";
      ?> -->
    </form>
    <div class="clearfix"></div>
  </section>